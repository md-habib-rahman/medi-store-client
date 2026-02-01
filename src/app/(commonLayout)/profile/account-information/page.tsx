import React from 'react';

const page = () => {
	return (
		<div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                      Account Information
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                      Update your photo and personal information here
                    </p>
                  </div>
                  <Button className="bg-black hover:bg-gray-800 text-white">
                    Save Changes
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-900"
                    >
                      Name
                    </Label>
                    <div className="sm:col-span-2">
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-900"
                    >
                      Email
                    </Label>
                    <div className="sm:col-span-2">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-900"
                    >
                      Phone Number
                    </Label>
                    <div className="sm:col-span-2">
                      <div className="flex">
                        <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-gray-50">
                          <div className="w-6 h-4 bg-red-500 rounded-sm mr-2"></div>
                          <span className="text-sm text-gray-700">BD</span>
                          <svg
                            className="w-4 h-4 ml-1 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+880"
                          
                          className="rounded-l-none flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center pt-6 border-t">
                    <Label className="text-sm font-medium text-gray-900">
                      Password
                    </Label>
                    <div className="sm:col-span-2 flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Updated 28 minutes ago
                      </span>
                      <Button
                        variant="link"
                        className="text-sm underline p-0 h-auto"
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
	);
};

export default page;