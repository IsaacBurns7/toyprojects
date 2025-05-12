import pandas as pd	
import itertools	
import openpyxl	
from openpyxl.utils import get_column_letter	

INPUT_FILE = "tenants.xlsx" #can be csv	
SHEET_NAME = "Sheet1" #only if excel	
OUTPUT_FILE = "vacancies.xlsx"	

def apt_labels(letters):	
    return [l for l in letters if l.upper() != 'I']	

building_specs = {	
    '10': {	
        'floors': range(2, 38),	
        'labels': apt_labels('ABCDEFGHIJK')	
    },	
    '20': {	
        'floors': range(2, 38),	
        'labels': apt_labels('ABCDEFGHIJK')	
    },	
    '30': {	
        'floors': range(2, 38),	
        'labels': apt_labels('ABCDEFGHIJK')	
    },	
    '40': {	
        'floors': range(1, 33),	
        'labels': apt_labels('ABCDEFGHIJKLM'),	
    },	
    '25': {	
        'floors': [25],	
        'labels': [f"{a}{a}" for a in itertools.product("ABCDEFGHIJKLMNOPQRSTUV", repeat=2)][0:20],	
    },	
}	

df = pd.read_excel(INPUT_FILE, sheet_name=SHEET_NAME)	

df['Bldg.'] = df["Bldg."].astype(str)	
df['Apt.'] = df['Apt.'].astype(str)	
existing_units = set(zip(df['Bldg.'], df['Apt.']))	

expected_units = set()	
for bldg, spec in building_specs.items():	
    for floor in spec['floors']:	
        for letters in spec['labels']:	
            apt = f"{floor}{letters}"	
            expected_units.add((bldg, apt))	

vacant_units = expected_units - existing_units	

vacant_data = []	
for bldg, apt in sorted(vacant_units):	
    row = {	
        'Unit': f"{bldg} {apt}",	
        'Bldg.': bldg,	
        'Apt.': apt,	
        'First Name': 'VACANT',	
        'Last Name': 'VACANT',	
        'Gender': 'VACANT',	
        'Tenant Status': 'VACANT',	
        'Category': 'VACANT',	
        'Lease Type': 'VACANT',	
        'Move In': '',	
        'Move Out': '',	
        'Cell Phone': '',	
        'Home Phone': '',	
        'Work Phone': '',	
        'Alternate Phone': '',	
        'Personal Email Address': '',	
        'Work Email Address': '',	
        'Alternate Email Address': ''	
    }	
    vacant_data.append(row)	

df_vacant = pd.DataFrame(vacant_data)	

df_master = pd.concat([df, df_vacant], ignore_index=True)	


# Custom sort key: zero-pad numeric prefix in apartment for correct sorting	

def sort_key(row):	
    bldg = str(row['Bldg.'])	
    apt = str(row['Apt.'])	

    # Extract numeric and letter parts from apartment number	
    num_part = ''	
    letter_part = ''	

    for char in apt:	
        if char.isdigit():	
            num_part += char	
        else:	
            letter_part += char	

    # Convert numeric part to integer for proper numerical sorting	
    num_part = int(num_part) if num_part else 0	

    return (bldg, num_part, letter_part)	

# Apply the sorting key to create a temporary column	
df_master['__sort__'] = df_master.apply(sort_key, axis=1)	

# Sort by the temporary column	
df_master = df_master.sort_values(by='__sort__')	

# Drop the temporary column	
df_master = df_master.drop(columns='__sort__')	

df_vacant['__sort__'] = df_vacant.apply(sort_key, axis = 1)	
df_vacant = df_vacant.sort_values(by='__sort__')	
df_vacant = df_vacant.drop(columns='__sort__')	

with pd.ExcelWriter(OUTPUT_FILE, engine = 'xlsxwriter') as writer:	
    df_master.to_excel(writer, index = False, sheet_name = "Master")	
    df_vacant.to_excel(writer, index = False, sheet_name='Vacant Units')	

print(f"Output saved to {OUTPUT_FILE}")