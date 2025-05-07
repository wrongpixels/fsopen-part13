CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes integer DEFAULT 0);

INSERT into blogs (author, url, title) values ('John Johnson', 'http://supnames.com', 'Ironic surnames');
INSERT into blogs (url, title) values ('http://missing-authors.blog', 'Anonymous Blogs - The Art');