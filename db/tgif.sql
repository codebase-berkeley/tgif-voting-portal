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
    description_text VARCHAR,
    deadline VARCHAR
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

INSERT INTO users(id, is_admin, username)
VALUES
    (1, TRUE, 'Teresa'),
    (2, FALSE, 'Warren'),
    (3, FALSE, 'Ryan'),
    (4, FALSE, 'Mentored');

INSERT INTO proposals(id, title, organization, amount_requested, link, description_text, deadline)
VALUES
    (1, 'Mapping for Environmental Justice', 'MEJ Team', 63000.00,
        'mappingforej.berkeley.edu', 'Mapping for Environmental Justice (MEJ) is an
        initiative to create interactive and publicly-accessible maps displaying
        environmental justice data for individual states. With guidance from the
        residents of impacted communities, MEJ combines environment, public health,
        and demographic data into an indicator of vulnerability for communities in
        every state.', '4/28/21'),
    (2, 'ASUC Garden', 'ASUC', 1050,
        'rando link', 'ASUC will be planting a garden at sproul!', '01/23/45');

INSERT INTO votes(vote, user_id, proposal_id)
VALUES
    (TRUE, 1, 1),
    (FALSE, 2, 2),
    (FALSE, 3, 1);

