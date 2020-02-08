const app = require('./app');

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Palette Picker';

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
