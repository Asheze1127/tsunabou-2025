FROM ruby:3.2.3

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

WORKDIR /app

COPY Gemfile Gemfile.lock ./

# Bundler を Gemfile.lock と同じバージョンにする
RUN gem install bundler -v 2.6.9
RUN bundle _2.6.9_ install

# プロジェクト全体をコピー
COPY . .

# サーバー起動
CMD ["bin/rails", "server", "-b", "0.0.0.0"]
