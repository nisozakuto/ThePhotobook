CREATE TABLE IF NOT EXISTS pictures
(
    id SERIAL PRIMARY KEY,
    album_id INT NOT NULL,
    picUrl TEXT,
    pic_desc VARCHAR(255),
    liked BOOLEAN 
);
