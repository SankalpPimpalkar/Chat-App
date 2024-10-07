export default function ProfileSkeleton() {
    return (
        <div className="p-5 bg-primary min-h-screen text-light">
            <div className="max-w-3xl mx-auto">
                {/* Profile Section */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full bg-light/20 animate-pulse"></div>
                    <div>
                        <div className="h-6 bg-light/20 rounded w-48 mb-2 animate-pulse"></div>
                        <div className="h-4 bg-light/20 rounded w-32 animate-pulse"></div>
                    </div>
                </div>

                <div className="h-4 bg-light/20 rounded w-full max-w-sm mb-2 animate-pulse"></div>
                <div className="h-4 bg-light/20 rounded w-full max-w-sm animate-pulse"></div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6 w-full">
                    <div className="py-2 bg-light/20 rounded w-full animate-pulse"></div>
                </div>
            </div>

            {/* Settings Section */}
            <div className="mt-10 max-w-3xl mx-auto">
                <h3 className="text-xl font-semibold mb-4">
                    Settings
                </h3>

                {/* Privacy Settings */}
                <div className="mb-6">
                    <h4 className="text-lg font-semibold text-accent mb-2">Privacy</h4>
                    <div className="flex items-center justify-between">
                        <span className="h-4 bg-light/20 rounded w-48 animate-pulse"></span>
                        <div className="w-8 h-4 bg-light/20 rounded animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <span className="h-4 bg-light/20 rounded w-48 animate-pulse"></span>
                        <div className="w-8 h-4 bg-light/20 rounded animate-pulse"></div>
                    </div>
                </div>

                {/* Account Settings */}
                <div className="mb-6">
                    <h4 className="text-lg font-semibold text-accent mb-2">Account Management</h4>
                    <div className="flex items-center justify-between">
                        <span className="h-4 bg-light/20 rounded w-48 animate-pulse"></span>
                        <div className="h-4 bg-light/20 rounded w-20 animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <span className="h-4 bg-light/20 rounded w-48 animate-pulse"></span>
                        <div className="h-4 bg-light/20 rounded w-20 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
