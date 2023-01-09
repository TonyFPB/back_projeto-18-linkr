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
            SELECT u.id as user_id,u.name, u.image as user_image, p.user_id as post_user_id, p.id, p.url, p.message, COUNT(l.id) as likes, m.title, m.image, m.description

            FROM users u LEFT JOIN posts p ON u.id = p.user_id

                         LEFT JOIN likes l ON  p.id = l.post_id
                         LEFT JOIN metadata m ON p.id = m.post_id
                         
            WHERE u.id = $1
            GROUP BY u.id, u.name, u.image, p.user_id, p.id, p.url, p.message, m.title, m.image, m.description
            ORDER BY likes;
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
