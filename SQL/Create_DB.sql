USE [master]

IF db_id('ElfG') IS NULL
  CREATE DATABASE [ElfG]
GO

USE [ElfG]
GO
DROP TABLE IF EXISTS [GroupSession];
DROP TABLE IF EXISTS [Group];
DROP TABLE IF EXISTS [FileUpload];
DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [GroupNote];
DROP TABLE IF EXISTS [GroupSessionAttendee];

DROP TABLE IF EXISTS [GameType];
DROP TABLE IF EXISTS [GroupMembership];
DROP TABLE IF EXISTS [UserType];

GO

CREATE TABLE [UserType] (
  [Id] INT PRIMARY KEY IDENTITY,
  [UserTypeName] VARCHAR(50) NOT NULL
);

CREATE TABLE [User] (
  [Id] INT PRIMARY KEY IDENTITY,
  [Username] VARCHAR(50) NOT NULL,
  [Email] VARCHAR(50) NOT NULL,
  [UserTypeId] INT NOT NULL,
  [IsActive] BIT NOT NULL,
  CONSTRAINT [FK_User_UserType] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
);

CREATE TABLE [Group] (
  [Id] INT PRIMARY KEY IDENTITY,
  [UserId] INT NOT NULL,
  [GroupName] VARCHAR(100) NOT NULL,
  [Description] TEXT NOT NULL,
  CONSTRAINT [FK_Group_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]),
);

CREATE TABLE [GroupNote] (
  [Id] INT PRIMARY KEY IDENTITY,
  [UserId] INT NOT NULL,
  [GroupId] INT NOT NULL,
  [Type] VARCHAR(50) NOT NULL,
  [Title] VARCHAR(100) NOT NULL,
  [Text] VARCHAR(1000) NOT NULL,
  [RelDate] DATE NOT NULL,
  [PostedOn] DATETIME NOT NULL,--INTENDING TO AlTER FROM TIMESTAMP
  CONSTRAINT [FK_GroupNote_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]),
  CONSTRAINT [FK_GroupNote_Group] FOREIGN KEY ([GroupId]) REFERENCES [Group] ([Id])
);

CREATE TABLE [GroupMembership] (
  [Id] INT PRIMARY KEY IDENTITY,
  [UserId] INT NOT NULL,
  [GroupId] INT NOT NULL,
  CONSTRAINT [FK_GroupMembership_Group] FOREIGN KEY ([GroupId]) REFERENCES [Group] ([Id]),
  CONSTRAINT [FK_GroupMembership_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]),
);

CREATE TABLE [GameType] (
  [Id] INT PRIMARY KEY IDENTITY,
  [Name] VARCHAR(50) NOT NULL
);

CREATE TABLE [FileUpload] (
  [Id] INT PRIMARY KEY IDENTITY,
  [Title] VARCHAR(100) NOT NULL,
  [Type] VARCHAR(50) NOT NULL,
  [File] VARCHAR(1000) NOT NULL,
  [UploadedOn] DATETIME NOT NULL, --INTENDING TO AlTER FROM TIMESTAMP
  [UploadedBy] INT NOT NULL,
  CONSTRAINT [FK_FileUpload_User] FOREIGN KEY ([UploadedBy]) REFERENCES [User] ([Id])
);

CREATE TABLE [GroupSession] (
  [Id] INT PRIMARY KEY IDENTITY,
  [UserId] INT NOT NULL,
  [GroupId] INT NOT NULL,
  [GameId] INT NOT NULL,
  [Date] DATE NOT NULL,
  [StartTime] TIME NOT NULL,
  [EndTime] TIME NOT NULL,
  [Location] VARCHAR(100) NOT NULL,
  [Notes] TEXT NOT NULL,
  [GameTypeId] INT NOT NULL,
  CONSTRAINT [FK_GroupSession_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]),
  CONSTRAINT [FK_GroupSession_Group] FOREIGN KEY ([GroupId]) REFERENCES [Group] ([Id]),
  CONSTRAINT [FK_GroupSession_GameType] FOREIGN KEY ([GameTypeId]) REFERENCES [GameType] ([Id])
);

CREATE TABLE [GroupSessionAttendee] (
  [Id] INT PRIMARY KEY IDENTITY,
  [SessionId] INT NOT NULL,
  [UserId] INT NOT NULL,
  CONSTRAINT [FK_GroupSessionAttendee_GroupSession] FOREIGN KEY ([SessionId]) REFERENCES [GroupSession] ([Id]),
  CONSTRAINT [FK_GroupSessionAttendee_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
);
GO
