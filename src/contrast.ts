export default function () {

    for (const preference of ['no-preference', 'high', 'more', 'low', 'less']) {

        if (matchMedia(`(prefers-contrast: ${preference})`)?.matches) {
            return preference;
        }
    }

    return 'no';
}

