#!/bin/sh

psql -U postgres -d umdt -c "select distinct count(*), array_agg(distinct tracking_data->'ssid') as ssid, tracking_data->'shost' as shost from data group by shost order by count desc;" > device_ssids.txt
