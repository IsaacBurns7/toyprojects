import openpyxl	

# Load the workbook and select the sheet	
wb = openpyxl.load_workbook('vacancies.xlsx')	
sheet = wb["Master"]  # Or specify the sheet name like wb['Sheet1']	
sheet2 = wb["Vacant Units"]	
# Function to autofit columns	
def autofit_columns(sheet):	
    for col in sheet.columns:	
        max_length = 0	
        column = col[0].column_letter  # Get the column name (e.g. 'A')	

        # Find the maximum length of data in each column	
        for cell in col:	
            try:	
                if len(str(cell.value)) > max_length:	
                    max_length = len(cell.value)	
            except:	
                pass	

        # Set the column width to the maximum length + some padding	
        adjusted_width = (max_length + 2)	
        sheet.column_dimensions[column].width = adjusted_width	

# Autofit the columns in the sheet	
autofit_columns(sheet)	
autofit_columns(sheet2)	

# Save the modified workbook	
wb.save('vacancies_autofitted.xlsx')