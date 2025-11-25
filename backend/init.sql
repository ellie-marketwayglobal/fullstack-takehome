-- Initialize the database with a users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Clear existing data
TRUNCATE users RESTART IDENTITY CASCADE;

INSERT INTO users (id, name, age, email, phone) VALUES
    (1, 'John Doe', 25, 'john.doe@example.com', '123-456-7890'),
    (2, 'Jane Smith', 30, 'jane.smith@example.com', '098-765-4321'),
    (3, 'Kevin Anderson', 29, 'kevin.anderson@example.com', '999-888-1111'),
    (4, 'Bob Johnson', 35, 'bob.johnson@example.com', '555-123-4567'),
    (5, 'Elham Abbasi', 28, 'elham.abbasi@example.com', '444-222-1111'),
    (6, 'Azar Abbasi', 40, 'azar.abbasi@example.com', '333-888-7777'),
    (7, 'Kamran vatanabasi', 22, 'kamran.vatanabadi@example.com', '222-333-4444'),
    (8, 'David Taylor', 31, 'david.taylor@example.com', '777-555-9999'),
    (9, 'Jessica Miller', 27, 'jessica.miller@example.com', '111-222-3333')
ON CONFLICT (email) DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'user_id') THEN
        ALTER TABLE posts ADD COLUMN user_id INTEGER NOT NULL DEFAULT 1 REFERENCES users(id) ON DELETE CASCADE;
    END IF;
END $$;

INSERT INTO posts (id, user_id, title, content, created_at, updated_at) VALUES
    -- Posts by John Doe (user_id: 1)
    (1, 1, 'Getting Started with Rust', 'Rust is a systems programming language focused on safety, speed, and concurrency.', '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
    (2, 1, 'Understanding Ownership', 'Ownership is Rust''s most unique feature.', '2025-01-02 14:30:00', '2025-01-02 14:30:00'),
    (3, 1, 'Building Web APIs', 'Learn how to build robust web APIs using Axum and async-graphql.', '2025-01-03 09:15:00', '2025-01-03 09:15:00'),

    -- Posts by Jane Smith (user_id: 2)
    (4, 2, 'GraphQL vs REST', 'GraphQL offers flexible queries and strong typing, while REST provides simplicity and caching.', '2025-01-01 16:20:00', '2025-01-01 16:20:00'),
    (5, 2, 'Database Design Patterns', 'Effective database design requires understanding normalization.', '2025-01-02 11:45:00', '2025-01-02 11:45:00'),
    (6, 2, 'Frontend State Management', 'Modern frontend apps need robust state management.', '2025-01-04 13:10:00', '2025-01-04 13:10:00'),

    -- Posts by Bob Johnson (user_id: 4)
    (7, 4, 'Docker Containerization', 'Containers provide consistent environments from development to production.', '2025-01-01 08:30:00', '2025-01-01 08:30:00'),
    (8, 4, 'Kubernetes Deployment', 'Kubernetes orchestrates containerized applications at scale.', '2025-01-03 15:45:00', '2025-01-03 15:45:00'),
    (9, 4, 'CI/CD Best Practices', 'Continuous integration and deployment streamline software delivery.', '2025-01-06 12:00:00', '2025-01-06 12:00:00'),
    (10, 4, 'Monitoring and Observability', 'Monitoring and Observability with Docker.', '2025-01-06 12:00:00', '2025-01-06 12:00:00'),
    -- Posts by User 3 (Kevin Anderson)
    (11, 3, 'Intro to TypeScript', 'TypeScript adds static typing to JavaScript and improves developer experience.', '2025-01-02 09:40:00', '2025-01-02 09:40:00'),
    (12, 3, 'Why I Love React Query', 'React Query simplifies data fetching and caching in React apps.', '2025-01-03 12:25:00', '2025-01-03 12:25:00'),

    -- Posts by User 5 (Elham Abbasi)
    (14, 5, 'Serverless AWS Tips', 'Lambda cold starts can be minimized with provisioned concurrency.', '2025-01-01 07:55:00', '2025-01-01 07:55:00'),
    (15, 5, 'Demystifying OAuth2', 'OAuth2 provides secure delegated access using tokens instead of credentials.', '2025-01-04 14:50:00', '2025-01-04 14:50:00'),
    (16, 5, 'Event-Driven Architectures', 'Event-driven systems improve scalability and decoupling.', '2025-01-06 11:30:00', '2025-01-06 11:30:00'),

    -- Posts by User 6 (Azar Abbasi)
    (17, 6, 'CSS Grid vs Flexbox', 'Flexbox is great for one-dimensional layouts, while Grid handles complex two-dimensional layouts.', '2025-01-02 10:05:00', '2025-01-02 10:05:00'),
    (18, 6, 'Tailwind Utility Patterns', 'Utility-first CSS helps build consistent UI systems quickly.', '2025-01-03 17:20:00', '2025-01-03 17:20:00'),
    (19, 6, 'Dark Mode Strategies', 'Prefer CSS custom properties to easily switch themes.', '2025-01-04 08:45:00', '2025-01-04 08:45:00'),

    -- Posts by User 7 (Kamran vatanabasi)
    (20, 7, 'Intro to Postgres Indexing', 'Indexes speed up queries but can slow down writes.', '2025-01-01 13:35:00', '2025-01-01 13:35:00'),
    (21, 7, 'Caching with Redis', 'Redis is an in-memory store ideal for caching, queues, and real-time data.', '2025-01-03 19:55:00', '2025-01-03 19:55:00'),
    (22, 7, 'Async Patterns in Node.js', 'Understanding Promises and async/await is essential for modern JavaScript.', '2025-01-05 09:15:00', '2025-01-05 09:15:00')
ON CONFLICT (id) DO NOTHING;

-- Reset sequences for auto-increment
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('posts_id_seq', (SELECT MAX(id) FROM posts));