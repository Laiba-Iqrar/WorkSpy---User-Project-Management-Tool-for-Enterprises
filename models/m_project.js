const db = require('../db');

async function findProjectsByManager(managerId) {
  const [rows] = await db.query(
    `SELECT * FROM projects 
     WHERE project_id IN (
       SELECT DISTINCT project_id FROM tasks WHERE assign_by = ?
     )`,
    [managerId]
  );
  return rows;
}

module.exports = { findProjectsByManager };
