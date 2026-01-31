CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  skill_name TEXT NOT NULL,
  level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  progress INT DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);


CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT,
  github_link TEXT,
  live_link TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_user_project
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);


CREATE TABLE roadmaps (
  id SERIAL PRIMARY KEY,
  role TEXT NOT NULL UNIQUE,
  description TEXT
);


CREATE TABLE user_roadmap_progress (
  id SERIAL PRIMARY KEY,
  user_id INT,
  step_id INT,
  completed BOOLEAN DEFAULT false,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (step_id) REFERENCES roadmap_steps_template(id),
  UNIQUE(user_id, step_id)
);


CREATE TABLE roadmap_steps_template (
  id SERIAL PRIMARY KEY,
  roadmap_id INT,
  step_order INT,
  step_title TEXT,
  step_description TEXT,
  resources TEXT,

  FOREIGN KEY (roadmap_id) REFERENCES roadmaps(id) ON DELETE CASCADE
);


-- Total skills
SELECT COUNT(*) FROM skills WHERE user_id=$1;

-- Completed skills
SELECT COUNT(*) FROM skills WHERE user_id=$1 AND progress=100;

-- Average progress
SELECT AVG(progress) FROM skills WHERE user_id=$1;

-- Skill levels distribution
SELECT level, COUNT(*) 
FROM skills 
WHERE user_id=$1 
GROUP BY level;

