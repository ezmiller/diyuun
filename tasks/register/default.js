module.exports = function (grunt) {
	grunt.registerTask('default', ['compileAssets', 'linkAssets', 'notify:server', 'watch']);
};
