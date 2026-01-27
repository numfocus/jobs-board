import json
import glob
import sys
import datetime
import os

import yaml


class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (datetime.date, datetime.datetime)):
            return obj.isoformat()


jobs = []
for job in glob.glob('jobs/*.yaml'):
    if job == 'jobs/template.yaml':
        continue

    print(f'-> {job}...', end='')
    # We could also allow specification of date inside job post file
    # For now, it is parsed from the filename
    try:
        date_str = job.split('jobs/')[1].split('_')[0]
        date = datetime.date(*(int(x) for x in date_str.split('-')))
    except Exception as e:
        print(f'Exception: {e}')
        print(f'Unable to parse date from filename {job}. Exiting.')
        sys.exit(1)

    post = yaml.load(open(job, "r"), Loader=yaml.Loader)

    expires = post.get('expires')
    if not expires:
        print(f'\nError: Missing "expires" field in {job}.')
        sys.exit(1)

    if not isinstance(expires, datetime.date):
        # Try to parse expiry date, in case YAML loader didn't do so already
        try:
            expires = datetime.date.fromisoformat(str(expires))
        except ValueError:
            print(f'\nError: Invalid "expires" date format in {job}: {expires}. Use YYYY-MM-DD.')
            sys.exit(1)

    # Normalize datetime to date (no time) to avoid timestamp issues in JS
    if isinstance(expires, datetime.datetime):
        print(f'\nStripping timestamp from expiry date in {job}: {expires}')
        expires = expires.date()

    post['expires'] = expires
    post['date'] = date
    post['id'] = os.path.splitext(os.path.basename(job))[0]

    jobs.append(post)
    print('OK')

jobs = list(sorted(jobs, key=lambda x: x['date'], reverse=True))

outfile = 'src/jobs.mjs'
with open(outfile, 'w') as f:
    f.write('const jobs = ')
    f.write(JSONEncoder().encode(jobs))
    f.write('\nexport default jobs;\n')
print(f'Wrote posts to [{outfile}]')
