create table Album
(
    AlbumId text PRIMARY KEY,
    [Name] text not null,
    Artist text not null,
    [Image] text
)

create table Track
(
    TrackId text PRIMARY KEY,
    AlbumId text not null,
    [Name] text not null,
    TrackNumber INTEGER not null,
    [Rank] Integer,
    FOREIGN KEY (AlbumId) REFERENCES Album(AlbumId)
)

SELECT name
FROM sqlite_master
WHERE type='table'

SELECT *
FROM Album

SELECT *
FROM Track

INSERT INTO Album
    (AlbumId, Name, Artist, Image)
VALUES
    ('15Id9Jrqab8IwHFirdrrLp', 'MUDBOY', 'Sheck Wes', 'www.com')


SELECT Track.Name, Album.Name
FROM Track join Album using(AlbumId)

INSERT INTO Track
    (TrackId, AlbumId, Name, TrackNumber)
VALUES
    ('15Id9JrqabsdHFirsadasdrLp', '2062YmB5HeofjMCiPMLv', "testerrr", 1)