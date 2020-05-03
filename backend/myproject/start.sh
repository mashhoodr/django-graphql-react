#!/bin/sh

set -e

host="$1"
shift
cmd="$@"

# until psql -h "$host" -U "postgres" -c '\q'; do
#   >&2 echo "Postgres is down, sleeping..."
#   sleep 1
# done

# currently we dont install postgres in the backend repo, we may do that in the future for
# better stability on this.
sleep $host

>&2 echo "Postgres is :rocket:"
exec $cmd
