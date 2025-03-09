const pool = require('../db');

const User = {
  async create(username, password) {
    const [result] = await pool.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password]
    );
    return result.insertId;
  },
  async findByUsername(username) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return rows[0];
  },
  async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  async checkUsernameAvailability(username) {
    try {
      const [rows] = await pool.execute(
        'SELECT COUNT(*) as count FROM users WHERE username = ?',
        [username]
      );
      return rows[0].count === 0; // Return true if username is available (count = 0)
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  },

  async suggestUsername(username) {
    let suggestedUsername;
    let isAvailable = false;
    while (!isAvailable) {
      const randomNumber = Math.floor(1000 + Math.random() * 9000); // Random 4 digit number
      suggestedUsername = `${username}${randomNumber}`;
      isAvailable = await this.checkUsernameAvailability(suggestedUsername);
    }
    return suggestedUsername;
  }
};

module.exports = User;