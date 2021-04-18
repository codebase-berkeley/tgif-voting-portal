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

INSERT INTO users(is_admin, username, email, tgif_role)
VALUES
    (TRUE, 'Teresa Yu', 'teresa@berkeley.edu', 'TGIF Coordinator'),
    (TRUE, 'Jessie McGinley', 'jessiem23@berkeley.edu', 'Program Associate'),
    (TRUE, 'Elizabeth Reyes', 'elizabeth.reyes@berkeley.edu', 'Program Associate'),
    (TRUE, 'Joshua Kay', 'joshua_kay@berkeley.edu', 'Program Associate'),

    (FALSE, 'Moe Sumino', 'moe_sumino@berkeley.edu', 'ASUC Representative'),
    (FALSE, 'Youjin Chung', 'youjin.chung@berkeley.edu', 'Faculty Representative'),
    (FALSE, 'Ben Perez', 'ben.perez1978@berkeley.edu', 'Administration Representative'),
    (FALSE, 'Mike Edwards', 'mike.edwards@berkeley.edu', 'Capital Projects Representative'),
    (FALSE, 'Nanticha Lutt', 'nan_lutt@berkeley.edu', 'GA Representative'),
    (FALSE, 'Elias Garcia', 'elias_garcia@berkeley.edu', 'Environmental Justice - At Large Representative'),
    (FALSE, 'Sarah Bui', 'sarah.bui123@berkeley.edu', 'Undergraduate At-Large Representative'),

    (FALSE, 'Sharon Daraphonhdeth', 'sharon@berkeley.edu', 'SERC Director'),
    (FALSE, 'Harrisen Min', 'harrisen.min@berkeley.edu', 'Committee on Student Fees Representative'),
    (FALSE, 'Kira Stoll', 'kira.stoll@berkeley.edu', 'Office of Sustainability Director'),
    (FALSE, 'Bruce Chamberlain', 'bruce.chamberlain24@berkeley.edu', 'Energy Office Representative'),
    (FALSE, 'Samantha Deng', 'samantha.deng@berkeley.edu', 'Committee on Student Fees Representative'),
    (FALSE, 'Judy Chess', 'judy.chess45@berkeley.edu', 'Capital Planning Representative');

INSERT INTO proposals(title, organization, amount_requested, link, description_text)
VALUES
    ('Mapping for Environmental Justice', 'MEJ Team', 63000.00,
        'mappingforej.berkeley.edu', 'Mapping for Environmental Justice (MEJ) is an
        initiative to create interactive and publicly-accessible maps displaying
        environmental justice data for individual states.'),
    ('ASUC Garden', 'ASUC', 1050,
        'rando link', 'ASUC will be planting a garden at sproul!');

INSERT INTO votes(vote, user_id, proposal_id)
VALUES
    (TRUE, 1, 1),
    (FALSE, 2, 2),
    (FALSE, 3, 1);

INSERT INTO comments(time_posted, comment_text, user_id, proposal_id)
VALUES
    ('2021-04-05T10:27:41.886Z', 'I really like the mission of this proposal. It will add a lot of value to the community. I think we should approve it!', 2, 1),
    ('2021-04-06T13:45:41.886Z', 'I don''t quite see the value in funding this proposal. Let''s not approve it', 3, 1);
