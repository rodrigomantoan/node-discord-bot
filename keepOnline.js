var keepOnline = bot.listen(process.env.PORT, function() {
    console.log('Bot is listening on port ' + listener.address().port);
  });