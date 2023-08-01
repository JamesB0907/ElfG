USE [ElfG]
GO

SET IDENTITY_INSERT UserType ON;
INSERT INTO UserType (Id, UserTypeName) VALUES
  (1, 'Player'),
  (2, 'Game Master'),
  (3, 'Admin');
SET IDENTITY_INSERT UserType OFF;

SET IDENTITY_INSERT [User] ON;
INSERT INTO [User] (Id, Username, Email, UserTypeId) VALUES
  (1, 'JohnDoe', 'john.doe@example.com', 1),
  (2, 'JaneSmith', 'jane.smith@example.com', 1),
  (3, 'GMMaster', 'gm.master@example.com', 2),
  (4, 'Player1', 'player1@example.com', 1),
  (5, 'Player2', 'player2@example.com', 1),
  (6, 'Player3', 'player3@example.com', 1),
  (7, 'Player4', 'player4@example.com', 1),
  (8, 'Player5', 'player5@example.com', 1),
  (9, 'Player6', 'player6@example.com', 1),
  (10,'GameMASTER4', 'gm4@example.com', 2),
  (11, 'ADMIN', 'admin@example.com', 3),
  (12, 'GAMEmaster12', 'gm12@example.com', 2),
  (13, 'Player7', 'player7@example.com', 1);
SET IDENTITY_INSERT [User] OFF;

SET IDENTITY_INSERT [Group] ON;
INSERT INTO [Group] (Id, UserId, GroupName, [Description]) VALUES
  (1, 3, 'Adventurers United', 'Group for adventurers looking for quests'),
  (2, 10, 'Epic Boardgamers', 'Group for playing epic board games'),
  (3, 12, 'Dungeons & Dragons Party', 'Group for playing D&D campaigns');
SET IDENTITY_INSERT [Group] OFF;

SET IDENTITY_INSERT GroupNote ON;
INSERT INTO [GroupNote] (Id, UserId, GroupId, [Type], Title, [Text], RelDate, PostedOn) VALUES
  (1, 1, 1, 'Campaign Log', 'Session 1', 'The party ventured into the forest...', '2023-07-15', GETDATE()),
  (2, 2, 1, 'Session Plan', 'Session 2', 'Prepare encounters and NPCs...', '2023-07-20', GETDATE());
SET IDENTITY_INSERT GroupNote OFF;

SET IDENTITY_INSERT GroupMembership ON;
INSERT INTO [GroupMembership] (Id, UserId, GroupId) VALUES
  (1, 1, 1),
  (2, 2, 1),
  (3, 3, 1),
  (4, 4, 1),
  (5, 5, 1),
  (6, 6, 1),
  (7, 7, 1),
  (8, 8, 1),
  (9, 9, 1),
  (10, 3, 2),
  (11, 4, 2),
  (12, 5, 2),
  (13, 1, 3),
  (14, 2, 3),
  (15, 3, 3),
  (16, 10, 2),
  (17, 12, 3);
SET IDENTITY_INSERT GroupMembership OFF;

SET IDENTITY_INSERT GameType ON;
INSERT INTO [GameType] (Id, Name) VALUES
  (1, 'Dungeons & Dragons'),
  (2, 'Pathfinder'),
  (3, 'Warhammer 40,000'),
  (4, 'Settlers of Catan'),
  (5, 'Ticket to Ride'),
  (6, 'Magic: The Gathering'),
  (7, 'Carcassonne'),
  (8, 'Twilight Imperium'),
  (9, 'Call of Cthulhu'),
  (10, 'King of Tokyo');
SET IDENTITY_INSERT GameType OFF;

SET IDENTITY_INSERT FileUpload ON;
INSERT INTO [FileUpload] (Id, Title, [Type], [File], UploadedOn, UploadedBy) VALUES
  (1, 'Character Sheet', 'PDF', 'character_sheet.pdf', GETDATE(), 1),
  (2, 'Campaign Map', 'Image', 'campaign_map.jpg', GETDATE(), 3);
SET IDENTITY_INSERT FileUpload OFF;

SET IDENTITY_INSERT GroupSession ON;
INSERT INTO [GroupSession] (Id, UserId, GroupId, GameId, GameTypeId, [Date], StartTime, EndTime, [Location], Notes) VALUES
  (1, 3, 1, 1, 1, '2023-07-25', '18:00', '22:00', 'Tavern', 'Prepare for a tough battle...'),
  (2, 10, 2, 2, 1, '2023-07-27', '19:00', '23:00', 'Friend''s House', 'Bring your favorite snacks...'),
  (3, 3, 1, 3, 1, '2023-07-30', '20:00', '23:00', 'Wizard''s Tower', 'Unravel the mysteries...');
SET IDENTITY_INSERT GroupSession OFF;

SET IDENTITY_INSERT GroupSessionAttendee ON;
INSERT INTO [GroupSessionAttendee] (Id, SessionId, UserId) VALUES
  (1, 1, 1),
  (2, 1, 2),
  (3, 1, 4),
  (4, 2, 2),
  (5, 2, 5),
  (6, 2, 6),
  (7, 3, 1),
  (8, 3, 4),
  (9, 3, 5);
SET IDENTITY_INSERT GroupSessionAttendee OFF;
GO
