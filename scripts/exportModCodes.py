import json

# Open and load the JSON file
with open('scripts/moduleFullInfo.json', encoding="utf8") as file:
    data = json.load(file)

# Collect all module codes in a list
module_codes = [f'"{course["moduleCode"]}"' for course in data]

# Write the module codes to a single line in the CSV file
with open('scripts/modCodes.csv', 'w', newline='', encoding='utf8') as csvfile:
    csvfile.write(', '.join(module_codes))
