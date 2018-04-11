

def run_test(s3_client, validation_csv_filename):
	tdf = pd.read_csv(validation_csv_filename)
	tdf.sort_values('s3_key', inplace=True)
	successes = []
	for r in range(tdf.shape[0]):
		row = tdf.iloc[r]
		s3_key = row['s3_key']
		local_file = download_locally(s3_client, s3_key)
		educations = get_educations(local_file)
		match_any = False
		for edu in educations:
			success = True
			for value in [ "institution", "degree_level", "years_low", "years_high" ]: # degree_type left out on purpose
				if not (match(edu[value], row[value])):
					success = False
			if success:
				match_any = True
		successes.append(match_any)
	return len(successes) / tdf.shape[0]


def download_locally(s3_client, s3_key):
	i = s3_key.rfind('/')
	fname = s3_key[i+1:]
	local_folder = './tmp/'
	if not(os.path.exists(local_folder)):
		os.mkdir(local_folder)
	dest = local_folder + fname
	if not(os.file.exists(dest)):
		# TODO: use s3_client to download s3_key to dest
	return local_file

def get_educations(local_file):
	# TODO: implement this
	return [{"institution": "?", "degree_type": "?", "degree_level": "?", "years_low": 2004, "years_high": 2015}]