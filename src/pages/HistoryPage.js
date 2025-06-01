import React from 'react';
import './HistoryPage.css';

const HistoryPage = () => {
  return (
    <div className="history-page">
      <header className="history-header">история кафедры</header>

      <div className="timeline">
        <div className="timeline-item fade-in">
          <div className="timeline-year">1971</div>
          <div className="timeline-dot" />
          <div className="timeline-content">
            История берет начало в 1971 году, когда приказами Министерства высшего образования
            СССР и МИНХ и ГП им. И.М. Губкина была введена новая специальность АСУ.
          </div>
        </div>

        <div className="timeline-item fade-in">
          <div className="timeline-year">1974</div>
          <div className="timeline-dot" />
          <div className="timeline-content">
            Первая учебная группа была сформирована из студентов 2 курса других специальностей,
            начавших обучение в 1969 г. И уже в 1974 году состоялся первый выпуск студентов по
            специальности АСУ.
          </div>
        </div>

        <div className="timeline-item fade-in">
          <div className="timeline-year">1975</div>
          <div className="timeline-dot" />
          <div className="timeline-content">
            На фоне стремительного развития кибернетики, вычислительной техники и методов 
            системного анализа в 1975 году была создана кафедра АСУ.
          </div>
        </div>

          <div className="timeline-item horizontal fade-in">
  <div className="photo-container">
    <img 
      src="/image.png" 
      alt="Шишкин Олег Петрович"
      className="history-photo"
    />
  </div>
  <div className="timeline-content2">
    Основателем и первым заведующим кафедры стал профессор Олег Петрович Шишкин — 
    выдающийся ученый, внесший значительный вклад в автоматизацию нефтегазовой отрасли.
  </div>
</div>
      </div>
    </div>
  );
};

export default HistoryPage;
