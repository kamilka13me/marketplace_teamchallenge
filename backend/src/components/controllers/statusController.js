const StatusController = {

    ping: async (req, res) => {
        res.status(200).json({ message: 'server online' });
    },

    info: async (req, res) => {
        const currentDate = new Date();
        console.log(currentDate);

        res.status(200).json({
            message: 'server online',
            serverTime: currentDate,
        });
    },

};

module.exports = StatusController;