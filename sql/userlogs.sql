select user.user_id, user.name, userlogs.createdAt,userlogs.ip from user,userlogs where user.user_id=userlogs.user_id;


select * from userlogs ORDER BY createdAt ASC;

select * from userlogs where createdAt >= '2022-01-19 11:02:06' AND createdAt <= '2022-01-19 16:23:49'  AND loggedin = 'true' ORDER BY createdAt ASC;

INSERT INTO userlogs (userLogs_id,ip,loggedin,user_id)
VALUES ('29', '123123123', 'true', '2'),
('30', '123123123', 'true', '2'),
('31', '123123123', 'true', '2'),
('32', '192.168.1.98', 'true', '3'),
('33', '192.168.1.98', 'false', '3'),
('34', '192.168.1.9', 'false', '1'),
('35', '192.168.1.9', 'false', '1');

INSERT INTO userlogs (userLogs_id,ip,loggedin,user_id)
VALUES ('36', '192.168.1.9', 'true', '1'),('37', '192.168.1.9', 'true', '1');

SELECT 
    user.name,
    userlogs.loggedin,
    userlogs.userLogs_id,
    userlogs.createdAt,
    userlogs.user_id
FROM
    user
        LEFT JOIN
    userlogs ON user.user_id = userlogs.user_id
WHERE
    createdAt >= '2022-01-19 11:02:06' AND createdAt <= '2022-01-19 16:23:49'
        AND user.name = 'hema' AND userlogs.loggedin='login'
ORDER BY loggedin desc
