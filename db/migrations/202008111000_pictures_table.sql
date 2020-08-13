CREATE TABLE IF NOT EXISTS pictures
(
    id SERIAL PRIMARY KEY,
    album_id INT NOT NULL,
    picUrl TEXT,
    pic_desc VARCHAR(255),
    liked BOOLEAN 
);


ALTER TABLE pictures 
RENAME COLUMN picUrl TO pic_url;

ALTER TABLE pictures
ADD COLUMN pic_url_full_size TEXT;