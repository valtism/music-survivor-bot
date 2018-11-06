create table Album (
    AlbumId text PRIMARY KEY,
    [Name] text not null,
    Artist text not null,
    [Image] text
)

create table Track (
    TrackId text PRIMARY KEY,
    AlbumId text not null,
    Name text not null,
    TrackNumber INTEGER not null,
    [Rank] Integer,
    FOREIGN KEY (AlbumId) REFERENCES Album(AlbumId)
)

SELECT name FROM sqlite_master WHERE type='table'

SELECT * from Album

INSERT INTO Album (AlbumId, Name, Artist, Image) VALUES ('15Id9Jrqab8IwHFirdrrLp', 'MUDBOY', 'Sheck Wes', 'www.com')