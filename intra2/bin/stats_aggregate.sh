#!/bin/bash
source ~/env/bin/activate
cd ~/project

# Usage:
# */1 * * * * ~/project/bin/stats_aggregate.sh live > ~/logs/cron.log 2>&1

python projectile/manage.py stats_aggregate --settings=projectile.settings_$1