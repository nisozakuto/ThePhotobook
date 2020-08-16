CREATE TABLE IF NOT EXISTS albums(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL
);

ALTER TABLE albums
ADD COLUMN album_cover text;