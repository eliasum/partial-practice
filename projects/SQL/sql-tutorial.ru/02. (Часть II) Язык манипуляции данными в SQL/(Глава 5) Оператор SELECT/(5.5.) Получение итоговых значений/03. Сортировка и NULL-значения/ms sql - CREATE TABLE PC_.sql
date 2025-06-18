/*2021.03.16 18:22 IMM*/

USE [sql-ex]
GO

/****** Object:  Table [dbo].[PC_]    Script Date: 16.03.2021 18:14:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PC_](
	[code] [int] NOT NULL,
	[model] [varchar](50) NOT NULL,
	[speed] [smallint] NOT NULL,
	[ram] [smallint] NOT NULL,
	[hd] [real] NOT NULL,
	[cd] [varchar](10) NOT NULL,
	[price] [money] NULL,
 CONSTRAINT [PK_PC_] PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[PC_]  WITH CHECK ADD  CONSTRAINT [FK_PC__product] FOREIGN KEY([model])
REFERENCES [dbo].[Product] ([model])
GO

ALTER TABLE [dbo].[PC_] CHECK CONSTRAINT [FK_PC__product]
GO

INSERT INTO PC_  
SELECT *   
FROM PC;  
GO  