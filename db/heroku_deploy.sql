-- name of postgres app: tgif

DROP TABLE IF EXISTS users, proposals, comments, votes;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    privileges VARCHAR, --'Admin', 'Voting Member', 'Non-Voting Member'
    username VARCHAR,
    email VARCHAR,
    tgif_role VARCHAR
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

-- INSERT TEST DATA HERE

INSERT INTO users(privileges, username, email, tgif_role)
VALUES
    ('Admin', 'Teresa Yu', 'teresa@berkeley.edu', 'TGIF Coordinator'),
    ('Admin', 'Jessie McGinley', 'jessiem23@berkeley.edu', 'Program Associate'),
    ('Admin', 'Elizabeth Reyes', 'elizabeth.reyes@berkeley.edu', 'Program Associate'),
    ('Admin', 'Joshua Kay', 'joshua_kay@berkeley.edu', 'Program Associate'),
    ('Admin', 'Warren', 'warrenwwang@berkeley.edu', 'Codebase'),
    ('Admin', 'Ryan', 'ryanzhao@berkeley.edu', 'Codebase');