module.exports = {
  getBallotBoxFromEngineer(engineer) {
    return this.getBallotBoxFromOeaNumber(engineer.oea_number);
  },

  getBallotBoxFromOeaNumber(oeaNumber) {
    const rangesMapping = [
      { start: 1, end: 10000, box: "1" },
      { start: 10001, end: 20000, box: "2" },
      { start: 20001, end: 30000, box: "3" },
      { start: 30001, end: 40000, box: "4" },
      { start: 40001, end: 50000, box: "5" },
      { start: 50001, end: 60000, box: "6" },
      { start: 60001, end: 70000, box: "7" },
    ];

    const range = rangesMapping.find((r) => oeaNumber >= r.start && oeaNumber <= r.end);
    return range ? range.box : null;
  },

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  },
};
