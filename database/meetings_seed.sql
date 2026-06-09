CREATE DATABASE IF NOT EXISTS meetings_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE meetings_db;

CREATE TABLE development_groups (
  group_id   INT          NOT NULL AUTO_INCREMENT,
  group_name VARCHAR(100) NOT NULL,
  PRIMARY KEY (group_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE meetings (
  meeting_id  INT          NOT NULL AUTO_INCREMENT,
  group_id    INT          NOT NULL,
  start_time  DATETIME     NOT NULL,
  end_time    DATETIME     NOT NULL,
  description TEXT,
  room        VARCHAR(100) NOT NULL,
  PRIMARY KEY (meeting_id),
  CONSTRAINT fk_meetings_group
    FOREIGN KEY (group_id)
    REFERENCES development_groups (group_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO development_groups (group_name) VALUES
  ('Team UI'),
  ('Team Mobile'),
  ('Team React'),
  ('Team Backend'),
  ('Team DevOps');

INSERT INTO meetings (group_id, start_time, end_time, description, room) VALUES
  (1, '2025-05-01 09:00:00', '2025-05-01 10:00:00', 'Sprint 12 planning session',         'Blue Room'),
  (1, '2025-05-08 14:00:00', '2025-05-08 15:30:00', 'Design system review',                'New York Room'),
  (2, '2025-05-03 11:00:00', '2025-05-03 12:00:00', 'iOS release retrospective',           'Large Board Room'),
  (2, '2025-05-15 10:00:00', '2025-05-15 11:00:00', 'Android performance deep-dive',       'Blue Room'),
  (3, '2025-05-10 09:30:00', '2025-05-10 10:30:00', 'Component library migration',         'New York Room'),
  (4, '2025-05-20 13:00:00', '2025-05-20 14:00:00', 'API versioning strategy',             'Large Board Room'),
  (5, '2025-05-22 15:00:00', '2025-05-22 16:00:00', 'CI/CD pipeline audit',                'Blue Room');

INSERT INTO meetings (group_id, start_time, end_time, description, room) VALUES
  (1, '2026-07-01 09:00:00', '2026-07-01 10:00:00', 'Sprint 20 planning session',          'Blue Room'),
  (1, '2026-07-05 14:00:00', '2026-07-05 15:30:00', 'Accessibility audit kickoff',         'New York Room'),
  (2, '2026-07-02 11:00:00', '2026-07-02 12:00:00', 'Push notifications architecture',     'Large Board Room'),
  (3, '2026-07-08 09:30:00', '2026-07-08 10:30:00', 'React 19 upgrade planning',           'Blue Room'),
  (4, '2026-07-10 13:00:00', '2026-07-10 14:30:00', 'Microservices breakdown discussion',  'New York Room'),
  (5, '2026-07-15 15:00:00', '2026-07-15 16:00:00', 'Kubernetes cluster scaling review',   'Large Board Room');
