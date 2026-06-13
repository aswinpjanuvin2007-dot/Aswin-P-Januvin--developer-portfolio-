import os
import json
import requests

# Your exact GitHub username
USERNAME = "aswinpjanuvin2007-dot"
URL = f"https://api.github.com/users/{USERNAME}/repos?per_page=100&sort=updated"

def fetch_repositories():
    try:
        print(f"Connecting to GitHub API for user: {USERNAME}...")
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(URL, headers=headers)
        response.raise_for_status()
        repos = response.json()
        
        project_list = []
        for repo in repos:
            repo_name = repo['name'].lower().strip()
            # This safely skips your portfolio repo even with trailing dashes
            if not repo['fork'] and "developer-portfolio" not in repo_name:
                project_list.append({
                    "name": repo['name'],
                    "description": repo['description'] or "Personal development project.",
                    "html_url": repo['html_url'],
                    "language": repo['language'] or "JavaScript",
                    "stars": repo['stargazers_count']
                })
        
        with open("projects.json", "w") as f:
            json.dump(project_list, f, indent=4)
            
        print(f"Successfully updated projects.json with {len(project_list)} projects!")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    fetch_repositories()
