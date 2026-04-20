#!/bin/bash

if [[ $1 == "remove" ]]; then
	if type update-alternatives >/dev/null 2>&1; then
		update-alternatives --remove k-lens /usr/bin/k-lens
	else
		rm -f /usr/bin/k-lens
	fi
fi
