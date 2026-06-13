import os
import json
import requests

# Your GitHub username
USERNAME = "aswinpjanuvin2007-dot"
URL = f"https://api.github.com/users/{USERNAME}/repos?sort=updated"

def fetch_repositories():
    try:
        print(f"Fetching repositories for user: {USERNAME}...")
        response = requests.get(URL)
        response.raise_for_status()
        repos = response.json()
        
        project_list = []
        for repo in repos:
            # Skip repository forks and skip your portfolio repository itself
            if not repo['fork'] and repo['name'] != "Aswin-P-Januvin--developer-portfolio-":
                project_list.append({
                    "name": repo['name'],
                    "description": repo['description'] or "No description provided.",
                    "html_url": repo['html_url'],
                    "language": repo['language'] or "Mixed",
                    "stars": repo['stargazers_count']
                })
        
        # Overwrite your local projects.json file with the new data array
        with open("projects.json", "w") as f:
            json.dump(project_list, f, indent=4)
            
        print(f"Successfully updated projects.json with {len(project_list)} repositories!")
        
    except Exception as e:
        print(f"An error occurred while fetching: {e}")

if __name__ == "__main__":
    fetch_repositories()
