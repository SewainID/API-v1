const ping = (req, res) => {
  res.json({ message: 'Ping!' });
};

module.exports = { ping };
