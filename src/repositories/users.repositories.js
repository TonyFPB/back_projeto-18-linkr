import connection from "../db/db.js";

// export function getPostsLikesUser(id) {
//   return connection.query(
//     `
//             SELECT u.name, u.image, p.url, p.message, COUNT(l.id) as likes

//             FROM users u LEFT JOIN posts p ON u.id = p.user_id

//                          LEFT JOIN likes l ON  p.id = l.post_id

//             WHERE u.id = $1
//             GROUP BY u.name, u.image, p.url, p.message
//             ORDER BY likes;
//         `,
//     [id]
//   );
// }

export function getPostsLikesUser(id) {
  return connection.query(
    `
    SELECT
    f.id,
    f.is_repost,
    f.user_id AS feed_user,
    W.name AS repost_name, 
    p.id AS post_id,
    u.id AS post_user,
    (u.id=$1) AS owner,
    u.image AS image,
    u.name AS name,
    p.url,
    p.message,
    (SELECT row_to_json(m) FROM (SELECT metadata.title, metadata.description, metadata.image FROM metadata WHERE post_id = p.id)m) AS metadata,
    COUNT(l.id) as likes
FROM feed f 
JOIN posts p ON f.post_id = p.id
LEFT JOIN likes l ON  p.id = l.post_id
JOIN users u ON u.id = p.user_id 
JOIN users w ON w.id = f.2
JOIN metadata m ON p.id= m.post_id
WHERE user_id=$1
GROUP BY f.id,u.id, u.name, w.name, u.image, f.user_id, p.id, p.url, p.message, m.title, m.image, m.description
ORDER BY p.id DESC
LIMIT 20
        `,
    [id]
  );
}

export function getTrending() {
  return connection.query(
    `
         SELECT h.name, COUNT(h.id)
         FROM hashtags h JOIN posts_hashtags ph ON h.id = ph.hashtag_id
         GROUP BY h.name
         ORDER BY COUNT(h.id) DESC
        `
  );
}

export function findUserByName(name) {
  return connection.query(
    `
        SELECT id, name, image
        FROM users u
        WHERE name ILIKE $1
      `,
    [name + "%"]
  );
  //    ,['%' + name + '%' ])
}

export function findUserByNameFollowsFirst(name, idFollower){
  return connection.query(`
  with follows as (SELECT users.id, users.name, users.image, 'follows' as origin
  FROM users
  join follows on users.id=follows.account
  WHERE name ILIKE $1 and follows.user=($2)), anyone as (SELECT id, name, image, 'anyone' as origin
  FROM users
  WHERE name ILIKE $1 and id not in (select id from follows))
  SELECT * from follows union all SELECT * from anyone order by origin desc
  `, [`${name}%`, idFollower])
}

// export function findUserImageById(id){
//   return connection.query(`SELECT image FROM users WHERE id=$1`,[id])
// }

export function findUserImageById(id){
  return connection.query(`SELECT * FROM users WHERE id=$1`,[id])
}
