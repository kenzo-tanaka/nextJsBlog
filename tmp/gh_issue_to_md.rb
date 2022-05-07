require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  gem 'graphql-client'
end

require 'graphql/client'
require 'graphql/client/http'

module GitHubAPI
  HTTP = GraphQL::Client::HTTP.new('https://api.github.com/graphql') do
    def headers(context)
      {
        "Authorization" => "Bearer #{ENV['ACCESS_TOKEN']}"
      }
    end
  end

  Schema = GraphQL::Client.load_schema(HTTP)
  Client = GraphQL::Client.new(schema: Schema, execute: HTTP)
end

class GhIssue
  QUERY = GitHubAPI::Client.parse <<-GraphQL
    query() {
      repository(owner: "kenzo-tanaka", name: "nextJsBlog") {
				issues(
					first: 3,
					orderBy: { field: CREATED_AT, direction: DESC }
					labels: "article-publish"
					states: OPEN
				) {
					nodes {
						title
						body
						updatedAt
						number
					}
				}
			}
    }
  GraphQL
end 

