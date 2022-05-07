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
    query {
      repository(owner: "kenzo-tanaka", name: "nextJsBlog") {
				issues(
					first: 3
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

	def self.call
		res = exec_query
		res.data.repository.issues.nodes
	end

	def self.exec_query
		GitHubAPI::Client.query(QUERY)
	end
end

nodes = GhIssue.call
nodes.each do |node|
	md_body = <<~TEXT
		---
		title: '#{node.title}'
		date: '#{node.updated_at}'
		category: 'dev'
		---

		#{node.body}
	TEXT

	File.open("test-#{node.number}.md", "w") { |f| f.print md_body }
end