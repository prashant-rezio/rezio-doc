# Data Cleaning Script

## Overview
This Python script is designed to clean, validate, and process real estate broker data from an Excel file. The script ensures data integrity by retaining all rows, handling missing values, formatting phone numbers, validating emails, and standardizing text fields. It outputs the cleaned data to an Excel file with flags for missing or invalid data, providing a comprehensive and traceable cleaning process.

## Features
1. **Data Loading**: Reads data from an Excel file while preserving original formats, such as leading zeros.
2. **Column Name Cleaning**: Strips whitespace from column headers for consistency.
3. **Missing Data Handling**: Fills missing critical values and flags rows with incomplete data.
4. **Duplicate Handling**: Flags duplicates instead of removing them.
5. **Phone Number Formatting**:
   - Formats numbers to the E.164 standard for UAE.
   - Retains original phone numbers alongside formatted ones.
6. **Email Validation**: Ensures emails are valid and replaces invalid entries with a placeholder.
7. **Date Conversion**: Converts date fields to a standard format and flags invalid dates.
8. **Text Standardization**: Standardizes text fields, ensuring consistent formatting.
9. **Logging**: Tracks each step of the cleaning process, providing detailed insights into row retention and transformations.
10. **Comprehensive Output**: Outputs the cleaned data to an Excel file, retaining original values and adding flags for review.

## Approach
The script processes data sequentially using the following steps:

1. **Load Data**
   - Reads the input Excel file into a Pandas DataFrame.
   - Ensures all columns are treated as strings to preserve data integrity.

2. **Clean Column Names**
   - Strips leading and trailing whitespace from column headers.

3. **Handle Missing Values**
   - Fills missing critical fields (e.g., email, broker number) with placeholders.
   - Adds a `Missing Data` flag to identify incomplete rows.

4. **Flag Duplicates**
   - Flags duplicate rows based on critical columns without removing them.

5. **Clean Phone Numbers**
   - Formats phone numbers to the UAE E.164 standard.
   - Retains the original phone number for reference.
   - Flags invalid phone numbers.

6. **Validate Emails**
   - Uses a regex pattern to validate email addresses.
   - Replaces invalid entries with a placeholder (`invalid@domain.com`).

7. **Convert Dates**
   - Converts date columns to a standard datetime format.
   - Flags invalid dates for review.

8. **Standardize Text Fields**
   - Converts text fields to uppercase and removes extra whitespace for consistency.

9. **Output Data**
   - Outputs the cleaned data to an Excel file, including flags for missing or invalid data.
   - Saves original and processed values for transparency.

## Usage
### Prerequisites
- Python 3.8 or later
- Required Python libraries:
  - pandas
  - numpy
  - openpyxl

### Installation
1. Clone the repository or download the script.
2. Install dependencies using:
   ```bash
   pip install pandas numpy openpyxl
   ```

### Running the Script
1. Place your input Excel file in the same directory as the script.
2. Update the `input_file` variable in the script with the name of your Excel file.
3. Run the script:
   ```bash
   python cleanup_data.py
   ```

### Output
- **Cleaned Data**: Saved as `cleaned_output.xlsx` in the same directory.
- **Log File**: The script logs detailed processing steps and errors to the console.

## Key Files
- `cleanup_data.py`: Main script for data cleaning and validation.
- `cleaned_output.xlsx`: Output file with cleaned data.
- `README.md`: Documentation for the script.

## Example
Given the following input data:

| CardHolderNameEn | CardHolderMobile | RealEstateNumber | CardIssueDate |
|------------------|------------------|------------------|---------------|
| John Doe         | 0501234567      | 123              | 2020-01-01    |
| Jane Smith       | 971|505432198   | 456              | Invalid Date  |

The script will produce the following output:

| Name English | Formatted Phone | Broker Number | CardIssueDate | Missing Data | Phone Valid | CardIssueDate_Valid |
|--------------|-----------------|---------------|---------------|--------------|-------------|---------------------|
| John Doe     | +971501234567   | 123           | 2020-01-01    | False        | True        | True                |
| Jane Smith   | +971505432198   | 456           | NaT           | True         | True        | False               |

## Notes
- Ensure input files are in the correct format before running the script.
- For large datasets, processing time may vary based on system performance.

## Contact
For any issues or feature requests, please create an issue in the repository or contact the maintainer.

---

Enjoy using the Data Cleaning Script!
