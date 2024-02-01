const StatusController = {
  ping: async (req, res) => {
    res.status(200).json({ message: 'server online' });
  },

  info: async (req, res) => {
    const currentDate = new Date();

    res.status(200).json({
      message: 'server online',
      serverTime: currentDate,
    });
  },
};

export default StatusController;
