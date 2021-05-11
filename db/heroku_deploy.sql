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

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE tgif TO root;


-- INSERT TEST DATA HERE

INSERT INTO users(privileges, username, email, tgif_role)
VALUES
    ('Admin', 'Teresa Yu', 'teresa@berkeley.edu', 'TGIF Coordinator'),
    ('Admin', 'Jessie McGinley', 'jessiem23@berkeley.edu', 'Program Associate'),
    ('Admin', 'Elizabeth Reyes', 'elizabeth.reyes@berkeley.edu', 'Program Associate'),
    ('Admin', 'Joshua Kay', 'joshua_kay@berkeley.edu', 'Program Associate'),
    ('Admin', 'Anh the Admin Pham', 'anhvpham@berkeley.edu', 'rubiks cube master 9000'),
    ('Admin', 'Paola Noun', 'paolanoun@berkeley.edu', 'Boss'),
    ('Admin', 'Jorge Morales', 'jorge.morales@berkeley.edu', 'CEO'),
    ('Admin', 'Kalea', 'kaleachu@berkeley.edu', 'Codebase'),
    ('Admin', 'Warren', 'warrenwwang@berkeley.edu', 'Codebase'),
    ('Admin', 'Ryan', 'ryanzhao@berkeley.edu', 'Codebase'),
    ('Voting Member', 'Warren', 'warren.w.wang@gmail.com', 'Codebase'),
    ('Voting Member', 'Kennedy Chung', 'kennedychung@berkeley.edu', 'Codebase'),
    ('Voting Member', 'Bailey Segall', 'bailey.segall@berkeley.edu', 'Codebase'),
    
INSERT INTO proposals(title, organization, amount_requested, link, description_text)
VALUES
    ('The Team Writers Program at the Leaflet', 'The Student Environmental Resource Center (SERC)', 10102.32, 'https://drive.google.com/file/d/1PSPFeoJNlyQwGlQD3pCbI5q9HQh8TQc9/view',
        'As the only undergraduate student-run environmental publication in the University of California system, The Leaflet has broadened its mission to cover a wider array of environmental 
        subjects that pertain to both local, regional, and global communities. This funding will allow The Leaflet to financially support its writers and, as a result, benefit both the publication and the 
        Berkeley community. By hiring committed writers through a funded Staff Writer Program, the Leaflet will be able to increase the quality and number of written pieces, increase the publication’s operational 
        capacity, and provide a space for professional development. This grant would also allow students from low-income or non-traditional backgrounds to gain experience writing for a campus publication, strengthen 
        their understanding of environmental communications, and allow for a more diverse group of writers who may not have the capacity or the financial background to write for the publication as a part-time volunteer.'),
    ('Zero Waste Fellow', 'Kira Stoll, Office of Sustainability', 11725.92, 'https://drive.google.com/file/d/17GNLxN5t29AizKR__X93Cs_EvEIhgU3t/view',
        'At UC Berkeley, over a dozen organizations (both departmental and student-led) work on waste-related issues. Until 2019, collaboration and communication among them was minimal 
        and ineffective. The Zero Waste Coalition was established in Fall 2019 to allow for successful collaboration among organizations and to mobilize educational campaigns reaching over 5,000 students. Strong leadership within 
        the zero waste community is vital to its continued progress, and the creation of the Zero Waste Fellow position (similar to Carbon Neutrality or Engagement Fellows) will allow for institutionalized leadership that will 
        continue to build upon and expand zero waste work. This position will effectively institutionalize the Zero Waste Coalition, Zero Waste October, Compost Week, and Move Out programming.'),
    ('Resilient Sustainability Community Fellows', 'SERC, RSSP, OS', 46893, 'https://drive.google.com/file/d/1s2wyV1nAgPlBsFFQLbkUnnLXuO1vBwMi/view',
        'This Spring, the COVID- 19 global pandemic has radically shifted seniors’ last semesters at UC Berkeley and will most likely affect the career opportunities and job availability after 
        graduation in the sustainability community. This project hopes to provide up to seven (7) post-baccalaureate fellowships; with priority given to graduating seniors, but all students who may 
        have been impacted by COVID-19 will be eligible. These fellowships will offer graduating seniors the ability to continue their environmental work on campus for three additional months and to advance a variety 
        of important sustainability initiatives across campus. In a joint partnership, fellows would be advised by sustainability leadership in the Office of Sustainability, Residential Student Service Programs (RSSP), and 
        the Student Environmental Resource Center (SERC).');

-- INSERT INTO votes(vote, user_id, proposal_id)
-- VALUES

--     (TRUE, 10, 1),
--     (TRUE, 11, 1),
--     (FALSE, 12, 1),
--     (TRUE, 13, 1),
--     (TRUE, 14, 1),

--     (TRUE, 10, 2),
--     (TRUE, 11, 2),
--     (FALSE, 12, 2),
--     (TRUE, 13, 2),
--     (FALSE, 14, 2),
--     (FALSE, 15, 2),

--     (TRUE, 9, 3),
--     (FALSE, 10, 3),
--     (TRUE, 11, 3),
--     (TRUE, 12, 3),
--     (TRUE, 13, 3),
--     (FALSE, 14, 3),
--     (FALSE, 15, 3);


-- INSERT INTO comments(time_posted, comment_text, user_id, proposal_id)
-- VALUES
--     ('2021-04-05T10:27:41.886Z', 'I love their mission and I definitely think we should approve this', 1, 1),
--     ('2021-04-05T13:45:41.886Z', 'Their project is well thougth out but I just don''t see how this could be sustainable long-term', 2, 1),
--     ('2021-04-07T14:34:41.886Z', 'It''s a very good proposal and it seems like they have a good plan to make use of the grant', 3, 1),
--     ('2021-04-10T15:21:41.886Z', 'Their project is well thougth out but I just don''t see how this could be sustainable long-term. Maybe we could approve with reduced amount?', 4, 1),

--     ('2021-04-05T10:27:41.886Z', 'I love their mission and I definitely think we should approve this', 1, 2),
--     ('2021-04-05T13:45:41.886Z', 'Their project is well thougth out but I just don''t see how this could be sustainable long-term', 2, 2),
--     ('2021-04-07T14:34:41.886Z', 'It''s a very good proposal and it seems like they have a good plan to make use of the grant', 3, 2),
--     ('2021-04-10T15:21:41.886Z', 'Their project is well thougth out but I just don''t see how this could be sustainable long-term. Maybe we could approve with reduced amount?', 4, 2),

--     ('2021-04-05T10:27:41.886Z', 'I love their mission and I definitely think we should approve this', 1, 3),
--     ('2021-04-05T13:45:41.886Z', 'Their project is well thougth out but I just don''t see how this could be sustainable long-term', 2, 3),
--     ('2021-04-07T14:34:41.886Z', 'It''s a very good proposal and it seems like they have a good plan to make use of the grant', 3, 3),
--     ('2021-04-10T15:21:41.886Z', 'Their project is well thougth out but I just don''t see how this could be sustainable long-term. Maybe we could approve with reduced amount?', 4, 3),

--     ('2021-04-05T10:27:41.886Z', 'I love their mission and I definitely think we should approve this', 1, 4),
--     ('2021-04-05T13:45:41.886Z', 'Their project is well thougth out but I just don''t see how this could be sustainable long-term', 2, 4),

--     ('2021-04-05T10:27:41.886Z', 'I love their mission and I definitely think we should approve this', 1, 5),
--     ('2021-04-07T14:34:41.886Z', 'It''s a very good proposal and it seems like they have a good plan to make use of the grant', 3, 5),
--     ('2021-04-10T15:21:41.886Z', 'Their project is well thougth out but I just don''t see how this could be sustainable long-term. Maybe we could approve with reduced amount?', 4, 5);

