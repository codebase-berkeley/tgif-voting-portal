DROP DATABASE
IF EXISTS tgif;

CREATE DATABASE tgif;

CREATE USER root
WITH ENCRYPTED PASSWORD 'password';
\c tgif;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    privileges VARCHAR, --'Admin', 'Voting Member', 'Non-Voting Member'
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
-- checked BOOLEAN
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

CREATE TABLE currentPropID (
    propID SERIAL PRIMARY KEY
);



-- INSERT TEST DATA HERE

-- INSERT INTO table_name(optional columns)
-- VALUES
-- (first row here with commas seperating each column value of this row), 
-- (second row here),
-- ...
-- (last row here);


-- Example:

INSERT INTO users(privileges, username, email, tgif_role)
VALUES
    ('Admin', 'Anh the Admin Pham', 'anhvpham@berkeley.edu', 'rubiks cube master 9000'),
    ('Admin', 'Teresa Yu', 'teresa@berkeley.edu', 'TGIF Coordinator'),
    ('Admin', 'Jessie McGinley', 'jessiem23@berkeley.edu', 'Program Associate'),
    ('Admin', 'Elizabeth Reyes', 'elizabeth.reyes@berkeley.edu', 'Program Associate'),
    ('Admin', 'Joshua Kay', 'joshua_kay@berkeley.edu', 'Program Associate'),
    ('Admin', 'Paola Noun', 'paolanoun@berkeley.edu', 'Boss'),
    ('Admin', 'Jorge Morales', 'jorge.morales@berkeley.edu', 'CEO'),
    ('Admin', 'Kalea', 'kaleachu@berkeley.edu', 'The Big Cheese'),

    ('Voting Member', 'Anh the Voter Pham', 'wistyanh12@gmail.com', 'voteeee babyyy'),
    ('Voting Member', 'Moe Sumino', 'moe_sumino@berkeley.edu', 'ASUC Representative'),
    ('Voting Member', 'Youjin Chung', 'youjin.chung@berkeley.edu', 'Faculty Representative'),
    ('Voting Member', 'Sarah Bui', 'sarah.bui123@berkeley.edu', 'Undergraduate At-Large Representative'),
    ('Voting Member', 'Bailey Segall', 'bailey.segall@berkeley.edu', 'MAN'),
    ('Voting Member', 'Jorge Morales II', 'jorge.morales.21.11.01@gmail.com', 'CFO'),
    ('Voting Member', 'Kennedy Chung', 'kennedychung@berkeley.edu', 'The Big Cheese'),

    ('Non-Voting Member', 'Anh the Spectator Pham', 'anhvphxm@gmail.com', 'just reading and thinkingg'),
    ('Non-Voting Member', 'Jorge Morales III', 'erica.martinez1976@gmail.com', 'Jorge''s Mom'),
    ('Non-Voting Member', 'Sharon Daraphonhdeth', 'sharon@berkeley.edu', 'SERC Director'),
    ('Non-Voting Member', 'Harrisen Min', 'harrisen.min@berkeley.edu', 'Committee on Student Fees Representative'),
    ('Non-Voting Member', 'Kira Stoll', 'kira.stoll@berkeley.edu', 'Office of Sustainability Director'),
    ('Non-Voting Member', 'Bruce Chamberlain', 'bruce.chamberlain24@berkeley.edu', 'Energy Office Representative'),
    ('Non-Voting Member', 'Samantha Deng', 'samantha.deng@berkeley.edu', 'Committee on Student Fees Representative'),
    ('Non-Voting Member', 'Judy Chess', 'judy.chess45@berkeley.edu', 'Capital Planning Representative');

INSERT INTO proposals(title, organization, amount_requested, link, description_text)
VALUES
    ('Mapping for Environmental Justice', 'MEJ Team', 63000.00,
        'https://drive.google.com/file/d/1zZOT5lvYHwAacLNttcJ4K1_IzjZOvN2Z/view', 'Mapping for Environmental Justice (MEJ) is an
        initiative to create interactive and publicly-accessible maps displaying
        environmental justice data for individual states.'),
    ('Earth Action Initiative', 'Earth Action Initiative', 16000,
        'https://drive.google.com/file/d/1FiIFzVHEkDH9kJQFeAFPZoZHOJQ6ehFa/view',
        'The Earth Action Initiative will organize a variety of events and actions that build community,
        leverage existing efforts, inspire new plans, and find innovative ways to execute these actions through effective communication.'),
    ('Berkeley Student Farms Seed Library', 'Berkeley Seed Library', 3652.12,
        'https://drive.google.com/file/d/14svG4x5BfSu6Qdul0mCe6heZqcBQgFfV/view', 'The seed library
        will address a foundational barrier of access to the start-up resources necessary
        for expanding and sustaining the many gardens across campus that help grow food security.'),
    ('#OurEnvironmentalism', 'Grad Student Assembly', 5000, 'https://drive.google.com/file/d/1oCsX9tHY_Y6BbVF1X4-n07HM3PgrBidb/view',
        'The #OurEnvironmentalism campaign seeks to reclaim the legacies of environmentalism
        and sustainability for communities of color and challenge the white-dominated, inaccessible
        narrative of modern environmentalism by sharing personal stories of sustainability, highlighting
        EJ-focused students and activists of color on Cal’s campus'),
    ('Planting native milkweed habitat for monarch butterflies', 'Global Environment Theme House (GETH)', 500.00,
        'https://drive.google.com/file/d/1rKuWMsG0C95efVuNm8VU7edWnzsl2dkP/view', 'This proposal seeks to
        plant native California milkweed plants in demonstration plots on Clark Kerr campus as an educational project as part
        of the Global Environment Theme House (GETH).'),
    ('BerkeleyMoves! Carsharing Pilot', 'UC Berkeley Parking & Transportation', 15000, 'https://drive.google.com/file/d/1oJ_PjD6vheiUPqUP2jkMAjPg7NEhzU08/view',
        'The UC Berkeley Parking & Transportation Berkeley Moves! Alternative Transportation Unit provides active and alternative
        transportation solutions to the entire Cal community. P&T will be testing the use and need for carsharing to the students, primarily
        those who are in need, through the use of subsidizing memberships and/or driving credits.'),
    ('Biofuels Technology R&D and Procurement', 'Biofuels Technology Club (BTC)', 7055.53, 
        'https://drive.google.com/file/d/1wGtKrvS1JvxmjJELkGeTe0cMOdf8uSao/view',
        'Biofuels Technology Club (BTC) seeks to create a sustainable loop on campus by converting the dining hall waste cooking oil into biodiesel
        for use in campus vehicles. Combustion of biodiesel produces 78% less carbon dioxide than the combustion of ordinary diesel fuel. In addition, 
        normal diesel cars can use fuel made of 20% biodiesel and 80% diesel (a B20 blend) without any engine modifications. Thus, replacement of 20% of 
        the diesel used on campus with BTC biodiesel would be a convenient way to greatly reduce the carbon footprint of campus, as well as reduce oil waste. 
        In order to put BTC biodiesel in a vehicle, it must meet the stringent requirements of ASTM testing. The BTC Research Team is working towards 
        developing our benchtop-scale reaction to meet these tests, decrease waste, and increase efficiency such that the reaction can be carried out on a 
        larger scale by the Scale-Up Team. The Scale-Up Team manages and modifies a 50 gallon reactor at the Richmond Field Station for optimizing large-scale 
        production of quality biodiesel. The Finance and Logistics Teams enable biodiesel production by acquiring funding, ensuring safety, and managing waste 
        removal. In addition to production of high quality biodiesel, BTC seeks to educate the campus community on green technology through a Sustainability Seminar
        Series, as managed by the Outreach Team.'),
    ('Climate Fix Radio and Podcast', 'UC Berkeley Schools of Law and Journalism', 32911, 'https://drive.google.com/file/d/185XJR0ZIPWab5M4KYItz6rn5f7zaGOI9/view',
        'Climate Fix is a 90 second “bite-sized” audio clip produced by a partnership between the UC Berkeley Schools of Law and Journalism, featuring timely climate interviews with compelling 
        scientists, innovators, organizers, and leaders offering climate solutions and other examples of progress on climate change.'),
    ('Capturing Energy Savings from VAV Box Minimums', 'CEDR, Paul Raftery', 49937, 'https://drive.google.com/file/d/1VMYoFiws1LDQrRO6IsL0u1DQoA4nJlHq/view',
        'This project will move the campus towards carbon neutrality by reducing campus energy waste and the associated emissions, by reducing minimum airflows without changing the amount of ventilation (fresh) air entering the building.'),
    ('Cal Enviro Water Treatment', 'Cal Environmental Team (Cal Enviro)', 19010, 'https://drive.google.com/file/d/1KucszcV2JDSzYNXfafnTitJgPoBb4Hj6/view',
        'Cal Environmental Team (Cal Enviro) is a Civil and Environmental Engineering (CEE) competition team and DeCal. Our mission is to impart the fundamentals 
        of wastewater treatment and sustainable engineering design, provide hands-on laboratory and construction experience, and opportunities for students to 
        improve their public speaking and technical writing skills.'),
    ('Reducing the Impact of Chemical Education', 'Laura Fredriksen', 6000, 'https://drive.google.com/file/d/1ZjACJY8FlArOKL4veg4t5CZNX0A9FGXC/view',
        'The nature of chemical instruction can often produce unintended adverse environmental results. In 2016, our General Chemistry course series underwent an unprecedented 
        redesign. In addition to fully integrating green chemistry learning goals into both the majors and non-majors series, we also made steps toward reducing the environmental impact of 
        the course through lower student preparation volumes, elimination of hazardous chemicals, and using renewable resources where possible. As a next step, we are now turning toward our instruction of 
        Organic Chemistry courses. we will 1) measure the baseline environmental impact of solvent release from Organic Chemistry laboratory instruction of at least one course, 2) measure the harm reduction by 
        the purchase and implementation of an upgraded solvent-evaporation system, 3) identify major environmental concerns that the Instructional Unit can prioritize, and 4) identify key learning goals that can 
        be introduced as part of an Organic Chemistry curriculum redesign. This study will be lead by a team of undergraduates, and their work will be paid by this award. These students will also be empowered by staff 
        and faculty to engage the larger class of chemistry students in the discussion and study of green chemistry concepts while they undertake this study.'),
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

INSERT INTO votes(vote, user_id, proposal_id)
VALUES

    (TRUE, 10, 1),
    (TRUE, 11, 1),
    (FALSE, 12, 1),
    (TRUE, 13, 1),
    (TRUE, 14, 1),

    (TRUE, 10, 2),
    (TRUE, 11, 2),
    (FALSE, 12, 2),
    (TRUE, 13, 2),
    (FALSE, 14, 2),
    (FALSE, 15, 2),

    (TRUE, 9, 3),
    (FALSE, 10, 3),
    (TRUE, 11, 3),
    (TRUE, 12, 3),
    (TRUE, 13, 3),
    (FALSE, 14, 3),
    (FALSE, 15, 3);


INSERT INTO comments(time_posted, comment_text, user_id, proposal_id)
VALUES
    ('2021-04-05T10:27:41.886Z', 'I love their mission and I definitely think we should approve this', 1, 1),
    ('2021-04-05T13:45:41.886Z', 'Their project is well thougth out but I just don''t see how this could be sustainable long-term', 2, 1),
    ('2021-04-07T14:34:41.886Z', 'It''s a very good proposal and it seems like they have a good plan to make use of the grant', 3, 1),
    ('2021-04-10T15:21:41.886Z', 'Their project is well thougth out but I just don''t see how this could be sustainable long-term. Maybe we could approve with reduced amount?', 4, 1),

    ('2021-04-05T10:27:41.886Z', 'I love their mission and I definitely think we should approve this', 1, 2),
    ('2021-04-05T13:45:41.886Z', 'Their project is well thougth out but I just don''t see how this could be sustainable long-term', 2, 2),
    ('2021-04-07T14:34:41.886Z', 'It''s a very good proposal and it seems like they have a good plan to make use of the grant', 3, 2),
    ('2021-04-10T15:21:41.886Z', 'Their project is well thougth out but I just don''t see how this could be sustainable long-term. Maybe we could approve with reduced amount?', 4, 2),

    ('2021-04-05T10:27:41.886Z', 'I love their mission and I definitely think we should approve this', 1, 3),
    ('2021-04-05T13:45:41.886Z', 'Their project is well thougth out but I just don''t see how this could be sustainable long-term', 2, 3),
    ('2021-04-07T14:34:41.886Z', 'It''s a very good proposal and it seems like they have a good plan to make use of the grant', 3, 3),
    ('2021-04-10T15:21:41.886Z', 'Their project is well thougth out but I just don''t see how this could be sustainable long-term. Maybe we could approve with reduced amount?', 4, 3),

    ('2021-04-05T10:27:41.886Z', 'I love their mission and I definitely think we should approve this', 1, 4),
    ('2021-04-05T13:45:41.886Z', 'Their project is well thougth out but I just don''t see how this could be sustainable long-term', 2, 4),

    ('2021-04-05T10:27:41.886Z', 'I love their mission and I definitely think we should approve this', 1, 5),
    ('2021-04-07T14:34:41.886Z', 'It''s a very good proposal and it seems like they have a good plan to make use of the grant', 3, 5),
    ('2021-04-10T15:21:41.886Z', 'Their project is well thougth out but I just don''t see how this could be sustainable long-term. Maybe we could approve with reduced amount?', 4, 5);

