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

        <div className="timeline-item horizontal no-line fade-in">
          <div className="photo-container">
            <img 
              src="/image.png" 
              alt="Шишкин Олег Петрович"
              className="history-photo"
            />
            <figcaption>Шишкин Олег Петрович</figcaption>
          </div>
          <div className="timeline-content2">
            Основателем и первым заведующим кафедры стал профессор Олег Петрович Шишкин — 
            выдающийся ученый, внесший значительный вклад в автоматизацию нефтегазовой отрасли.
          </div>
        </div>

        <div className="timeline-content3">
          С первых лет кафедра ориентировалась на подготовку специалистов для нефтегазовой промышленности, 
          совмещая знания в области программирования, системного анализа и отраслевой специфики.
        </div>

        <div className="photo-container2">
          <img 
            src="/1.jpg" 
            alt="профессорско-преподавательский состав, 1976 год"
            className="history-photo"
          />
          <figcaption>профессорско-преподавательский состав, 1976 год</figcaption>
        </div>

        <div className="timeline-item fade-in">
  <div className="timeline-year">1983</div>
  <div className="timeline-dot" />
  <div className="timeline-content timeline-horizontal-block">
    <div className="text-block">
      С 1983 по 1996 год кафедрой руководил профессор Лев Александрович Овчаров. 
      В этот период кафедра активно развивалась, расширяя направления научных 
      исследований и образовательные программы.
    </div>
    <div className="image-block">
      <img 
        src="/ovcharov.jpg" 
        alt="Лев Александрович Овчаров"
        className="history-photo"
      />
      <figcaption>Лев Александрович Овчаров</figcaption>
    </div>
  </div>
</div>
<div className="timeline-item fade-in">
  <div className="timeline-year">1996</div>
  <div className="timeline-dot" />
  <div className="timeline-content timeline-horizontal-block">
    <div className="text-block">
      С 1996 года кафедру возглавил доцент, кандидат технических наук Леонид Иванович Григорьев.
      При нем были организованы лаборатории компьютерных тренажеров и корпоративных информационных систем. 
    </div>
    <div className="image-block">
      <img 
        src="/grigoriev.jpg" 
        alt="Леонид Иванович Григорьев"
        className="history-photo"
      />
      <figcaption>Леонид Иванович Григорьев</figcaption>
    </div>
  </div>
</div>
<div className="timeline-content3">
          В 1999 году началась подготовка магистров по направлению "Информатика и вычислительная техника".  
Кафедра стала тесно сотрудничать с ОАО “Газпром” и другими предприятиями отрасли.

        </div>
        <div className="timeline-item fade-in">
          <div className="timeline-year">2011</div>
          <div className="timeline-dot" />
          <div className="timeline-content">
            Введены новые профили программ подготовки: 
            "АСДУ в нефтегазовом комплексе", "Синергетика и управление", 
            "Информационные системы организационно-экономического управления". 
          </div>
        </div>
        <div className="photo-container2">
          <img 
            src="/2012.jpg" 
            alt="профессорско-преподавательский состав, 2012 год"
            className="history-photo"
          />
          <figcaption>профессорско-преподавательский состав, 2012 год</figcaption>
        </div>
        <div className="timeline-item fade-in">
  <div className="timeline-year">2020</div>
  <div className="timeline-dot" />
  <div className="timeline-content timeline-horizontal-block">
    <div className="text-block">
      С 2020 по 2023 год обязанности заведующего кафедрой исполнял декан факультета АиВТ, кандидат технических наук
Игорь Юрьевич Храбров. 
    </div>
    <div className="image-block">
      <img 
        src="/Khrabrov.jpg" 
        alt="Игорь Юрьевич Храбров"
        className="history-photo"
      />
      <figcaption>Игорь Юрьевич Храбров</figcaption>
    </div>
  </div>
</div>
<div className="timeline-item fade-in">
  <div className="timeline-year">2023</div>
  <div className="timeline-dot" />
  <div className="timeline-content timeline-horizontal-block">
    <div className="text-block">
      C 2023 г. кафедру возглавляет проректор по международной работе РГУ нефти и газа (НИУ) имени И.М. Губкина, доктор технических наук 
Александр Федорович Максименко.
    </div>
    <div className="image-block">
      <img 
        src="/Maximenko.jpg" 
        alt="Александр Федорович Максименко"
        className="history-photo"
      />
      <figcaption>Александр Федорович Максименко</figcaption>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default HistoryPage;
