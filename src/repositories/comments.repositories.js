import connection from "../db/db.js";

export async function insertComment(post_id, user_id, comment) {
    return connection.query('INSERT INTO comments (post_id,user_id,comment) VALUES($1,$2,$3)', [post_id, user_id, comment])
}

export async function findWithComments(user_id, post_id) {
    return connection.query(`SELECT 
    p.id,u1.name AS owner,p.url,p.message, 
    ARRAY_AGG(
        JSON_BUILD_OBJECT(
            'id',c.id,
            'ownerComment',u2.name,
            'text',c.comment,
            'isOwner', (u1.id=u2.id),
            'isFollowing',COALESCE((SELECT 
                CASE  
                WHEN f.user=$1 AND f.account=c.user_id THEN true
                ELSE false 
                END 
                FROM
                follows f
                WHERE
                f.user=$1
                AND
                f.account=c.user_id 
            ),false),
            'isYou',(c.user_id=$1)
        ) ORDER BY c.id
    ) AS comments
FROM 
    posts p 
LEFT JOIN 
    comments c 
ON 
    p.id = c.post_id
JOIN 
    users u1
ON
    u1.id=p.user_id
JOIN
    users u2
ON
    u2.id=c.user_id      
WHERE
    p.id=$2
GROUP BY
    p.id, u1.name`, [user_id, post_id])
}
