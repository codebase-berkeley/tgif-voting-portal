DROP DATABASE
IF EXISTS tgif;

CREATE DATABASE tgif;

CREATE USER root
WITH ENCRYPTED PASSWORD 'password';
\c tgif;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    is_admin BOOLEAN, 
    --    hashed_password VARCHAR,
    username VARCHAR
);

CREATE TABLE proposals
(

    id SERIAL PRIMARY KEY,
    title VARCHAR,
    organization VARCHAR,
    amount_requested FLOAT,
    link VARCHAR,
    description_text VARCHAR
);

CREATE TABLE comments
(   
    -- is_admin BOOLEAN -- we might need this to determine whether we display comments as anon
    id SERIAL PRIMARY KEY,
    time_posted TIMESTAMP,
    comment_text VARCHAR,
    user_id SERIAL REFERENCES users(id),
    proposal_id SERIAL REFERENCES proposals(id)
);

CREATE TABLE votes
(
    vote BOOLEAN,
    has_voted BOOLEAN, --not sure if this is necessary if we are only inserting a row once a user casts a vote
    user_id SERIAL REFERENCES users(id),
    proposal_id SERIAL REFERENCES proposals(id)

);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE tgif TO root;



-- INSERT TEST DATA HERE

-- INSERT INTO table_name(optional columns)
-- VALUES
-- (first row here with commas seperating each column value of this row), 
-- (second row here),
-- ...
-- (last row here);


-- Example:
INSERT INTO users(is_admin, username)
VALUES
    (TRUE, 'Teresa'),
    (FALSE, 'Warren'),
    (FALSE, 'Ryan'),
    (FALSE, 'Mentored');

INSERT INTO comments(id, time_posted, comment_text, user_id, proposal_id)
VALUES
    (1, 'Mar 31'),
    (2, 'Apr 1'),
    (2, 'May 4'),
    (3, 'Apr 20');