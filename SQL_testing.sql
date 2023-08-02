USE [ElfG];
GO

-- Change data type of Text column in GroupNote table
ALTER TABLE [GroupNote] 
ALTER COLUMN [Text] VARCHAR(MAX);

-- Change data type of Notes column in GroupSession table
ALTER TABLE [GroupSession]
ALTER COLUMN [Notes] VARCHAR(MAX);


SELECT g.GroupName AS GroupName, g.[Description] AS GroupDescription,

    MAX(gn.Id) AS GNId, MAX(gn.UserId) AS GNUserId, MAX(gn.GroupId) AS GNGroupId, COALESCE(MAX(gn.[Type]), 'N/A') AS GNType, COALESCE(MAX(gn.Title), 'N/A') AS GNTitle, COALESCE(MAX(gn.[Text]), 'N/A') AS GNText,
    MAX(gn.RelDate) AS GNRelDate, MAX(gn.PostedOn) AS GNPostedOn,

    MAX(gs.Id) AS GSId, MAX(gs.UserId) AS GSUserId, MAX(gs.StartTime) AS GSStartTime, MAX(gs.EndTime) AS GSEndTime,
    COALESCE(MAX(gs.[Location]), 'N/A') AS GSLocation, COALESCE(MAX(gs.Notes), 'N/A') AS GSNotes, MAX(gs.GameTypeId) AS GSGameTypeId, MAX(gs.Date) AS GSDate, MAX(gs.GroupId) AS GSGroupId,

    MAX(gm.Id) AS MemId, MAX(gm.UserId) AS MemUserId, MAX(gm.GroupId) AS GMGroupId
FROM [Group] g
    LEFT JOIN GroupNote gn ON g.Id = gn.GroupId 
    LEFT JOIN GroupSession gs ON g.Id = gs.GroupId  
    LEFT JOIN GroupMembership gm ON g.Id = gm.GroupId
WHERE g.Id = 1
GROUP BY g.GroupName, g.[Description]
ORDER BY g.Id DESC;

                SELECT g.Id AS GroupId, g.GroupName, g.[Description], g.UserId AS GUserId,
                       gn.Id AS GNId, gn.UserId AS GNUserId, gn.[Type] AS GNType, gn.Title AS GNTitle, gn.[Text] AS GNText, gn.RelDate AS GNRelDate, gn.PostedOn AS GNPostedOn,
                       gs.Id AS GSId, gs.UserId AS GSUserId, gs.StartTime AS GSStartTime, gs.EndTime AS GSEndTime, gs.[Location] AS GSLocation, gs.Notes AS GSNotes, gs.GameTypeId AS GSGameTypeId, gs.[Date] AS GSDate
                       
                FROM [Group] g
                JOIN GroupNote gn ON g.Id = gn.GroupId
                JOIN GroupSession gs ON g.Id = gs.GroupId
                
                WHERE g.Id = 1
