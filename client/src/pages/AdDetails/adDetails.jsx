import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdDetails, useAdActions } from '../../hooks/useAdDetails';
import Loader from '../../components/Loader';
import ImageCarousel from '../../components/ImageCarousel';
import ModerationHistory from '../../components/ModerationHistory';
import DecisionModal from '../../components/DecisionModal';
import Notification from '../../components/Notification';
import AdActionButtons from '../../components/AdActionButtons';
import AdCharacteristics from "../../components/AdCharacteristics";


import './AdDetailsPage.css';

const REJECT_REASONS = [
  'Запрещенный товар',
  'Подозрение на мошенничество',
  'Спам',
  'Грубые нарушения правил',
  'Другое'
];

const CHANGES_REASONS = [
  'Неверная категория',
  'Некорректное описание',
  'Проблемы с фото',
  'Опечатки в названии',
  'Не указана цена',
  'Другое'
];

const AdDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ad, isLoading, error, setAd } = useAdDetails(id);
  const { approveAd, rejectAd, requestChangesAd } = useAdActions();

  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const handleBack = () => navigate('/list');
  const handlePrev = () => navigate(`/item/${Number(id) - 1}`);
  const handleNext = () => navigate(`/item/${Number(id) + 1}`);

  

  const handleApprove = async () => {
    setIsActionLoading(true);
    try {
      const result = await approveAd(id);
      setAd(result.ad);
      showNotification('Объявление успешно одобрено!');
    } catch (e) {
      showNotification(e.message, 'error');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleRejectClick = () => {
    setActionType('reject');
    setModalOpen(true);
  };

  const handleRequestChangesClick = () => {
    setActionType('changes');
    setModalOpen(true);
  };

  const handleModalSubmit = async ({ reason, comment }) => {
    setIsActionLoading(true);
    try {
      let result;
      if (actionType === 'reject') {
        result = await rejectAd(id, reason, comment);
        showNotification('Объявление отклонено');
      } else if (actionType === 'changes') {
        result = await requestChangesAd(id, reason, comment);
        showNotification('Отправлен запрос на изменения');
      }
      if (result && result.ad) setAd(result.ad);
    } catch (e) {
      showNotification(e.message, 'error');
    } finally {
      setIsActionLoading(false);
      setModalOpen(false);
      setActionType(null);
    }
  };

  
  const getStatusClass = (status) => {
    switch (status) {
      case 'approved': return 'ad-details__status--approved';
      case 'rejected': return 'ad-details__status--rejected';
      case 'draft': return 'ad-details__status--draft';
      default: return 'ad-details__status--pending';
    }
  };

  
  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'ОДОБРЕНО';
      case 'rejected': return 'ОТКЛОНЕНО';
      case 'draft': return 'ЧЕРНОВИК (На доработке)';
      default: return status;
    }
  };

  const currentReasons = actionType === 'reject' ? REJECT_REASONS : CHANGES_REASONS;
  const currentTitle = actionType === 'reject' ? 'Отклонение объявления' : 'Вернуть на доработку';

  if (isLoading) return <Loader />;
  if (error || !ad) return <div style={{ padding: 20 }}>Ошибка: Объявление не найдено</div>;

  return (
    <div className="ad-details-page">

      <Notification
        message={notification?.message}
        type={notification?.type}
        onClose={() => setNotification(null)}
      />

      {}
      <div className="ad-details__nav">
        <button className="ad-details__nav-btn" onClick={handleBack}>
          ← Назад к списку
        </button>
        <div className="ad-details__nav-group">
          <button className="ad-details__nav-btn" onClick={handlePrev}>← Пред.</button>
          <button className="ad-details__nav-btn" onClick={handleNext}>След. →</button>
        </div>
      </div>

      <div className="ad-details__grid">
        {}
        <div className="ad-details__main">
          <h1 className="ad-details__title">{ad.title}</h1>

          <ImageCarousel images={ad.images} />

          <div className="ad-details__description-block">
            <h2 className="ad-details__subtitle">Описание</h2>
            <p className="ad-details__text">{ad.description}</p>

            <AdCharacteristics
              category={ad.category}
              price={ad.price}
              characteristics={ad.characteristics}
            />
          </div>
        </div>

        {}
        <div className="ad-details__sidebar">
          {}
          <div className="ad-details__card">
            <h3>Продавец</h3>
            <p><strong>{ad.seller?.name}</strong></p>
          </div>

          {}
          <div className="ad-details__card">
            <p>Статус:
              <span className={`ad-details__status ${getStatusClass(ad.status)}`}>
                {getStatusText(ad.status)}
              </span>
            </p>
          </div>

          {}
          <AdActionButtons
            status={ad.status}
            isLoading={isActionLoading}
            onApprove={handleApprove}
            onReject={handleRejectClick}
            onRequestChanges={handleRequestChangesClick}
          />

          {}
          <ModerationHistory history={ad.moderationHistory} />
        </div>
      </div>

      {}
      <DecisionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        title={currentTitle}
        options={currentReasons}
      />
    </div>
  );
};

export default AdDetailsPage;